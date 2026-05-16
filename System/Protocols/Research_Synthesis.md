# Obsidialith: Research Synthesis Protocol

This protocol defines the "Flagship Workflow" for Obsidialith: transforming a vague research query into a structured, linked knowledge node in the Nexus.

## Workflow: The Synaptic Research Loop

1. **Trigger**: User provides a topic.
   - *Example*: "Research the impact of Solid State Batteries on drone range."

2. **Phase 1: Discovery (Tetra)**
   - Tetra uses `firecrawl` and `langsearch` to extract high-signal data from the web.
   - Output: `Inbox/Captures/Research-Topic-Raw.md`

3. **Phase 2: Strategy (Fiona)**
   - Fiona reviews the raw data and identifies the "Core Project Brief."
   - Output: `Active/Research-Topic/brief.md` + `.canvas` Visual Root.

4. **Phase 3: Implementation (Ralph)**
   - Ralph synthesizes the raw data into a structured project index and technical notes.
   - Output: `Active/Research-Topic/_index.md` + Supporting notes.

5. **Phase 4: Promotion (Gene)**
   - Gene extracts the permanent "First Principles" from the project and creates a Nexus node.
   - Output: `Nexus/Research-Topic-Node.md`

---

## 🛠️ Execution Command

Run this command to execute the full loop:
```bash
gemini "Execute the Research Synthesis Protocol for: [YOUR TOPIC]"
```
