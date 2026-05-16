# Obsidialith

Turn Obsidian into an agentic execution environment where AI systems manage knowledge, projects, and workflows collaboratively.

Obsidialith is a framework that adds a structural and agentic layer to your Obsidian vault. It utilizes a council of specialized AI agents to automate research, architecture, implementation, and operations directly within your files.

---

## Core Features

- Multi-Agent Orchestration: Coordinate nine specialized agent profiles to manage different domains of your digital life and work.
- MCP Tool Integration: Built-in support for Model Context Protocol, enabling agents to use tools like web search, GitHub, Google Workspace, and specialized engineering APIs.
- Visual Strategy Mandate: Integrated use of Obsidian Canvas as a "Visual Root" for all projects, ensuring architectural clarity before implementation.
- Automated Knowledge Promotion: System protocols for elevating project-level insights into a permanent, global knowledge network (The Nexus).
- Standardized Operational Protocols: Pre-defined mandates for session logging, project initialization, and structural hygiene.
- Collaborative Workflows: Formalized "Strategy-to-Ship" pipelines where agents pass tasks and context between each other (e.g., Vision -> Design -> Engineering).
- Privacy-First Environment: Operates entirely within your local markdown files, maintaining full user control over data and identity.

---

## Prerequisites

- Obsidian: Installed and open.
- Gemini CLI: Installed on your system.
- Obsidian Local REST API Plugin: Installed and enabled.

---

## Option 1: Automated Setup (Recommended)

This path allows Gemini to automatically install required MCP servers and activate Agent Skills.

1. Clone this repository into your Obsidian vault directory:
   ```bash
   git clone https://github.com/notdevank/Obsidialith.git
   ```
2. Initialize the system and tools:
   ```bash
   gemini "Initialize the system by reading the setup protocol in System/Protocols/Setup.md"
   ```
   *The agent will automatically handle MCP server installations, environment configuration, and Skill validation.*

---

## Option 2: Manual Setup

Use this path for granular control over the installation of MCP servers and Agent Skills.

1. Clone this repository:
   ```bash
   git clone https://github.com/notdevank/Obsidialith.git
   ```
2. Skill Environment Configuration:
   ```bash
   cp .env.example .env
   # Add your Gemini, Firecrawl (Research Skill), and GitHub (Ops Skill) keys
   ```
3. MCP Server Configuration:
   ```bash
   cp .gemini/settings.json.example .gemini/settings.json
   # Install required MCP packages (npm install -g firecrawl-mcp, etc.)
   # Update paths in settings.json to match your local installation
   ```
4. Skill Verification:
   ```bash
   gemini --list-tools
   ```

---

## The Agent Council

The system is managed by specialized agents, each with a dedicated technical toolkit (MCP) and mandate.

| Agent | Role | Focus |
| :--- | :--- | :--- |
| Gene | Architect | Vault structure, MOC management, and architectural integrity. |
| Tetra | Researcher | Deep discovery, web extraction, and conceptual synthesis. |
| Rumi | Catalyst | Growth, marketing, content engine, and audience resonance. |
| Ralph | Engineer | Implementation, technical troubleshooting, and infrastructure. |
| Iola | Creative | UI/UX design, visual identity, and creative direction. |
| Echo | Operator | Automation, DevOps, and performance monitoring. |
| Fiona | Visionary | Product strategy, value proposition, and roadmapping. |
| Atlas | Strategist | Personal growth, scheduling, and accountability. |
| Vulture | Analyst | Financial analysis, market research, and legal-economic strategy. |

---

## System Structure

- Inbox: Capture point for raw data and unstructured inputs.
- Active: Working memory for high-momentum projects and trajectories.
- Nexus: Permanent, synaptic knowledge network and long-term memory.
- NCore: Core logic containing agent neural profiles and system protocols.
- System: Infrastructure providing templates, logs, and automation tools.

---

## License
MIT License - Copyright (c) 2026 The Obsidialith Authors.
