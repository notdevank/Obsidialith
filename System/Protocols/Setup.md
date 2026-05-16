# Obsidialith: System Setup Protocol

This document serves as the machine-readable manifest for initializing the Obsidialith Agentic OS. When a new user runs Gemini for the first time in this vault, the agent should read this file to understand the full technical requirements and installation steps for all MCP servers and Skills.

---

## 🛠️ Exhaustive MCP Server Mapping

The following Model Context Protocol (MCP) servers must be configured in `.gemini/settings.json`.

| Domain | Agent(s) | MCP Server / Package | Setup Command | Primary Skills Enabled |
| :--- | :--- | :--- | :--- | :--- |
| **Vault Core** | Gene, Librarian | `gemini-obsidian` | `npm install -g gemini-obsidian` | `vault`, `search`, `index`, `links`, `lint` |
| **Web Discovery** | Tetra, Ralph | `firecrawl-mcp` | `npx firecrawl-mcp` | `firecrawl`, `web-scrape`, `search` |
| **Real-time Web** | Tetra, Vulture | `langsearch-mcp` | `npx langsearch-mcp` | `langsearch`, `market-intelligence` |
| **Knowledge Graph**| Tetra, Ralph | `rag-anything` | `npx rag-anything` | `rag`, `concept-mapping` |
| **Engineering** | Ralph, Echo | `genkit-mcp` | `npx genkit-mcp` | `genkit`, `ai-flows` |
| **Infrastructure** | Ralph, Echo | `supabase-mcp` | `npx supabase-mcp` | `supabase`, `database-ops` |
| **Browser Ops** | Ralph, Echo | `@playwright/mcp` | `npx @playwright/mcp` | `agent-browser`, `web-automation` |
| **DevTools** | Ralph, Echo | `chrome-devtools-mcp` | `npx chrome-devtools-mcp` | `debugging`, `performance-audit` |
| **Repositories** | Echo, Ralph | `@modelcontextprotocol/server-github` | `npx @modelcontextprotocol/server-github` | `github-ops`, `pr-management` |
| **UI/UX Design** | Iola | `stitch-mcp` | `npx stitch-mcp` | `stitch`, `ui-generation` |
| **Creative Arts** | Iola | `design-skills-mcp` | `npx design-skills-mcp` | `layout`, `typeset`, `colorize`, `polish` |
| **Visual Strategy**| Iola, Tetra | `excalidraw-mcp` | `npx excalidraw-mcp` | `diagram-generation`, `canvas-sync` |
| **Growth/Social** | Rumi | `growth-skills-mcp` | `npx growth-skills-mcp` | `content-engine`, `lead-intelligence` |
| **Social Automation**| Rumi | `twitter-automation` | `npx twitter-automation` | `tweet-ops`, `social-engagement` |
| **Workspace** | Atlas, Vulture | `google-workspace` | `npx @modelcontextprotocol/server-google-workspace` | `gmail`, `calendar`, `drive`, `sheets` |
| **Product Strategy**| Fiona, Atlas | `product-strategy-mcp`| `npx product-strategy-mcp` | `product-lens`, `shape`, `pricing` |
| **Personal Ops** | Atlas, Librarian | `personal-skills-mcp` | `npx personal-skills-mcp` | `productivity`, `habits`, `flashcards` |
| **Market/Finance** | Vulture | `alphavantage` | (HTTP Bridge) | `stock-analysis`, `economic-data` |
| **File Systems** | Vulture, Gene | `file-tools-mcp` | `npx file-tools-mcp` | `xlsx`, `pdf`, `docx`, `pptx` |

---

## 🔑 Required Environment Variables (.env)

Ensure these keys are present in your root `.env` file to unlock the corresponding skills:

```bash
# --- Core ---
OBSIDIAN_API_KEY="your_local_rest_api_key"

# --- Research & Discovery ---
FIRECRAWL_API_KEY="your_key"
LANGSEARCH_API_KEY="your_key"
CONTEXT7_API_KEY="your_key"

# --- Operations & Infrastructure ---
GITHUB_PERSONAL_ACCESS_TOKEN="your_pat"
SUPABASE_URL="your_url"
SUPABASE_SERVICE_ROLE_KEY="your_key"

# --- Domain Specific ---
TWITTER_API_KEY="your_key"
CANVA_API_KEY="your_key"
ALPHAVANTAGE_API_KEY="your_key"
STITCH_API_KEY="your_key"
```

---

## 🧪 Initialization Protocol

When the system is first activated, the **Gene** agent must:
1. **Scrub Environment**: Verify `.env` contains all keys required for the user's active vectors.
2. **Path Mapping**: Ensure all `command` paths in `.gemini/settings.json` point to valid executables.
3. **Skill Handshake**: Run `gemini --list-tools` and report any agents with "Broken Mandates" (missing required tools).
4. **Structural Sync**: Run `vault-lint` to initialize all `_index.md` files and folder structures.
