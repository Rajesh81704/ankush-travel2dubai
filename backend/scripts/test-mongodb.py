#!/usr/bin/env python3
import sys
import os
import re
import socket

"""
MongoDB Connection & Port Tester
Usage:
    python3 scripts/test-mongodb.py "mongodb://travel2d_travel2dubai:YOUR_PASSWORD@127.0.0.1:27017/travel2d_travel2dubai?authSource=travel2d_travel2dubai"
"""

def test_socket(host, port, timeout=3):
    print(f"[*] Checking TCP port reachability on {host}:{port}...")
    try:
        sock = socket.create_connection((host, port), timeout=timeout)
        sock.close()
        print(f"✅ Port {port} on {host} is reachable via TCP!")
        return True
    except Exception as e:
        print(f"❌ Port {port} on {host} is NOT reachable: {e}")
        return False

def main():
    uri = sys.argv[1] if len(sys.argv) > 1 else os.getenv("MONGODB_URI")
    if not uri:
        uri = "mongodb://travel2d_travel2dubai:travel2dubai@127.0.0.1:27017/travel2d_travel2dubai?authSource=travel2d_travel2dubai"

    if "YOUR_PASSWORD" in uri:
        print("\n⚠️ WARNING: URI contains placeholder 'YOUR_PASSWORD'. Please replace it with your actual password.\n")

    masked_uri = re.sub(r':([^:@]+)@', ':*****@', uri)
    print(f"[+] Testing URI: {masked_uri}")

    # Parse host & port
    match = re.search(r'@([^:/]+)(?::(\d+))?', uri)
    if not match:
        # standard fallback if no auth
        match = re.search(r'mongodb://([^:/]+)(?::(\d+))?', uri)

    host = match.group(1) if match else "127.0.0.1"
    port = int(match.group(2)) if match and match.group(2) else 27017

    port_ok = test_socket(host, port)

    try:
        import pymongo
        print("\n[*] pymongo is installed. Attempting full MongoDB authentication check...")
        client = pymongo.MongoClient(uri, serverSelectionTimeoutMS=5000)
        # Force server roundtrip
        info = client.server_info()
        print("✅ MongoDB connection and authentication SUCCESSFUL!")
        print(f"[+] Server MongoDB version: {info.get('version')}")

        # Extract db name
        db_match = re.search(r'27017/([^?]+)', uri)
        db_name = db_match.group(1) if db_match else "travel2d_travel2dubai"
        db = client[db_name]
        cols = db.list_collection_names()
        print(f"[+] Collections in '{db_name}': {cols}")
    except ImportError:
        print("\n[!] pymongo library is not installed locally. (TCP port check performed above)")
        print("    To run full authentication test with Python: pip install pymongo")
    except Exception as e:
        print(f"\n❌ MongoDB connection/auth failed: {e}")

if __name__ == "__main__":
    main()
