import os
import psycopg2
from dotenv import load_dotenv
load_dotenv()

def get_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )

# =========================
# EVENTS
# =========================

def create_event(event_name, description, event_date, venue):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO events (event_name, description, event_date, venue)
        VALUES (%s, %s, %s, %s)
        RETURNING event_id
    """, (event_name, description, event_date, venue))
    result = cur.fetchone()
    if result is None:
        cur.close()
        conn.close()
        return None
    event_id = result[0]
    conn.commit()
    cur.close()
    conn.close()
    return event_id

def get_events():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT event_id, event_name, description, event_date, venue
        FROM events
        ORDER BY event_id DESC
    """)
    events = cur.fetchall()
    cur.close()
    conn.close()
    return events

# =========================
# TASKS
# =========================

def create_task(event_id, task_name, assignee, deadline):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO tasks (event_id, task_name, assignee, deadline)
        VALUES (%s, %s, %s, %s)
        RETURNING task_id
    """, (event_id, task_name, assignee, deadline))
    result = cur.fetchone()
    if result is None:
        cur.close()
        conn.close()
        return None
    task_id = result[0]
    conn.commit()
    cur.close()
    conn.close()
    return task_id

def get_tasks(event_id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT task_id, task_name, assignee, deadline, status
        FROM tasks
        WHERE event_id = %s
        ORDER BY task_id DESC
    """, (event_id,))
    tasks = cur.fetchall()
    cur.close()
    conn.close()
    return tasks

# =========================
# CONNECTION TEST
# =========================

if __name__ == "__main__":
    try:
        conn = get_connection()
        print("Database connected successfully!")
        conn.close()
    except Exception as e:
        print("Database connection failed:", e)
