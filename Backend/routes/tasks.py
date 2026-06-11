from flask import Blueprint, request
from supabase_client import supabase
from email_service import send_email

task_bp = Blueprint("tasks", __name__)

@task_bp.route("/tasks", methods=["POST"])
def create_task():

    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    creator_email = data.get("creator_email")
    assigned_email = data.get("assigned_email")

    response = supabase.table("tasks").insert({
        "title": title,
        "description": description,
        "creator_email": creator_email,
        "assigned_email": assigned_email
    }).execute()

    # send_email(
    # assigned_email,
    # "New Task Assigned",
    # f"You have been assigned a task: {title}"
    # )

    return {
        "message": "Task created",
        "task": response.data
    }, 201

@task_bp.route("/tasks", methods=["GET"])
def get_tasks():

    tasks = supabase.table("tasks").select("*").execute()

    return tasks.data, 200

@task_bp.route("/tasks/<task_id>/complete", methods=["PATCH"])
def complete_task(task_id):

    response = supabase.table("tasks").update({
        "status": "Completed"
    }).eq(
        "id",
        task_id
    ).execute()

    creator_email = response.data[0]["creator_email"]


    # send_email(
    # creator_email,
    # "Task Completed",
    # "Your assigned task has been completed."
    # )

    return {
        "message": "Task completed",
        "task": response.data
    }, 200