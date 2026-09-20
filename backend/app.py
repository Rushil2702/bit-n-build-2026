from flask import Flask, request, jsonify
from flask_cors import CORS

from database import (
    create_event,
    get_events,
    create_task,
    get_tasks
)

app = Flask(__name__)
CORS(app)
# =========================
# EVENTS
# =========================

@app.route("/api/events", methods=["POST"])
def add_event():
    data = request.get_json()
    event_name = data.get("event_name")
    description = data.get("description")
    event_date = data.get("event_date")
    venue = data.get("venue")
    if not event_name:
        return jsonify({
            "error": "Event name is required"
        }), 400
    event_id = create_event(
        event_name,
        description,
        event_date,
        venue
    )
    if event_id is None:
        return jsonify({
            "error": "Event could not be created"
        }), 500
    return jsonify({
        "message": "Event created successfully",
        "event_id": event_id
    }), 201

@app.route("/api/events", methods=["GET"])
def fetch_events():
    events = get_events()
    result = []
    for event in events:
        result.append({
            "event_id": event[0],
            "event_name": event[1],
            "description": event[2],
            "event_date": str(event[3]) if event[3] else None,
            "venue": event[4]
        })
    return jsonify(result)

# =========================
# TASKS
# =========================

@app.route("/api/tasks", methods=["POST"])
def add_task():
    data = request.get_json()
    event_id = data.get("event_id")
    task_name = data.get("task_name")
    assignee = data.get("assignee")
    deadline = data.get("deadline")
    if not event_id or not task_name:
        return jsonify({
            "error": "event_id and task_name are required"
        }), 400
    task_id = create_task(
        event_id,
        task_name,
        assignee,
        deadline
    )
    if task_id is None:
        return jsonify({
            "error": "Task could not be created"
        }), 500
    return jsonify({
        "message": "Task created successfully",
        "task_id": task_id
    }), 201

@app.route("/api/tasks/<int:event_id>", methods=["GET"])
def fetch_tasks(event_id):
    tasks = get_tasks(event_id)
    result = []
    for task in tasks:
        result.append({
            "task_id": task[0],
            "task_name": task[1],
            "assignee": task[2],
            "deadline": str(task[3]) if task[3] else None,
            "status": task[4]
        })
    return jsonify(result)

# =========================
# SERVER
# =========================

if __name__ == "__main__":
    app.run(debug=True)
