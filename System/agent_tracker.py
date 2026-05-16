import json
import os
import sys
import time

STATE_FILE = ".gemini/tmp/agent_states.json"

def update_agent_state(agent_name, status, task=""):
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    
    try:
        if os.path.exists(STATE_FILE):
            with open(STATE_FILE, 'r') as f:
                states = json.load(f)
        else:
            states = {}
            
        states[agent_name] = {
            "status": status,
            "task": task,
            "last_update": time.time()
        }
        
        with open(STATE_FILE, 'w') as f:
            json.dump(states, f, indent=2)
            
    except Exception as e:
        print(f"Error updating agent state: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python agent_tracker.py <agent_name> <status> [task]")
    else:
        name = sys.argv[1].lower()
        status = sys.argv[2]
        task = sys.argv[3] if len(sys.argv) > 3 else ""
        update_agent_state(name, status, task)
