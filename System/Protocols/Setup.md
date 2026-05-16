# Obsidialith: System Setup Protocol

This document serves as the machine-readable manifest for initializing the Obsidialith Agentic OS. When a new user runs Gemini for the first time in this vault, the agent should read this file to understand the technical requirements and installation steps.

---

## 🛠️ Required MCP Servers

The following Model Context Protocol (MCP) servers must be configured in `.gemini/settings.json`.

| Domain | Agent | MCP Server / Package | Setup Command | Required Env Vars |
| :--- | :--- | :--- | :--- | :--- |
| Vault Core | Gene | `gemini-obsidian` | `npm install -g gemini-obsidian` | `OBSIDIAN_API_KEY` |
| Web Research | Tetra | `firecrawl-mcp` | `npx firecrawl-mcp` | `FIRECRAWL_API_KEY` |
| Repository | Echo | `@modelcontextprotocol/server-github` | `npx @modelcontextprotocol/server-github` | `GITHUB_PERSONAL_ACCESS_TOKEN` |
| Productivity | Atlas | `google-workspace` | `npx @modelcontextprotocol/server-google-workspace` | OAuth Credentials |
| Engineering | Ralph | `chrome-devtools-mcp` | `npx chrome-devtools-mcp` | (None) |
| Automation | Ralph | `@playwright/mcp` | `npx @playwright/mcp` | (None) |
| Financial | Vulture | `alphavantage` | (HTTP Bridge) | `ALPHAVANTAGE_API_KEY` |

---

## 🧪 Installation Steps for Agents

If the user asks to "Initialize the System," perform these steps:

1. **Environment Check**: Check for the existence of `.env`. If missing, copy `.env.example` to `.env`.
2. **Settings Check**: Check for `.gemini/settings.json`. If missing, copy `.gemini/settings.json.example` to `.gemini/settings.json`.
3. **Plugin Audit**: Verify that the `Obsidian Local REST API` plugin is active in `.obsidian/community-plugins.json`.
4. **Key Verification**: Ask the user to provide any missing API keys for the services listed in the table above.
5. **Tool Validation**: Run `gemini --list-tools` to confirm the servers are correctly connected.

---

## 📜 Post-Setup Validation

Once initialized, the first task for the **Gene** agent is to run a `vault-lint` to ensure the directory structure and indices are correctly synchronized.
