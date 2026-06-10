from flask import Blueprint, request
from supabase_client import supabase

user_bp = Blueprint("users", __name__)

@user_bp.route("/auth/google-user", methods=["POST"])
def save_google_user():

    data = request.get_json()

    email = data.get("email")
    name = data.get("name")

    existing = supabase.table(
        "users"
    ).select("*").eq(
        "email",
        email
    ).execute()

    if existing.data:
        return {
            "message": "User exists"
        }, 200

    supabase.table(
        "users"
    ).insert({
        "email": email,
        "name": name
    }).execute()

    return {
        "message": "User created"
    }, 201

@user_bp.route("/users")
def get_users():

    users = supabase.table(
        "users"
    ).select("*").execute()

    return users.data