# Obsidialith: System Directives

These directives are mandatory for all AI agents and CLI sessions operating within the Obsidialith vault.

## 1. Session Logging
- **Mandatory End-of-Session Log**: Before terminating a session, the agent MUST summarize all activities, decisions, and structural changes made during the turn.
- **Log Location**: Logs must be stored in `System/Logs/` using the naming convention `YYYY-MM-DD - [Short Description].md`.
- **Log Format**: Use the `Session Trace` template found in `System/Templates/`.

## 2. Project Initialization
- **STRICT CANVAS MANDATE**: Every new project, sub-project, or significant task MUST have an associated Obsidian Canvas (`.canvas`) created in the project folder BEFORE any other implementation or note-taking begins. This is a non-negotiable architectural requirement. Failure to create/update a canvas is a system violation.
- **Canvas Content**: The canvas must visually map the strategy, identify key file dependencies, and serve as the "Visual Root" for the project.
- **Project Structure**: New projects must be initialized with an `_index.md` file and appropriate frontmatter as defined in the `Project Note` template.

## 3. Structural Integrity
- **Root Hygiene**: DO NOT create new files or folders in the root of the Obsidialith vault. All new entities must be created within their designated subfolders (e.g., `Active/`, `System/`, `Inbox/`).
- **Gene Priority**: All structural changes (moves, renames, reorganizations) should be handled through the `gene` subagent whenever possible.
- **Link First**: Prioritize internal wikilinks (`[[Link]]`) over external references.
- **Template Usage**: Always use the provided templates in `System/Templates/` for new files to ensure consistency.

## 4. Operational Behavior
- **Conciseness**: Follow the high-signal, low-noise communication style.
- **Validation**: Every technical change must be validated with tests or verification scripts.

## 5. Specialist Agent Mapping
Subagents are pre-configured with specific "Domain Toolkits" to ensure comprehensive expertise.

| Subagent      | Domain                       | Assigned Skills                                                                                                                                                                                                                                                                                                         |
| :------------ | :--------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Gene**      | Vault & Architecture         | `vault`, `search`, `research`, `index`, `journal`, `links`, `cross-linker`, `moc-update`, `link-audit`, `vault-lint`                                                                                                                                                                                                    |
| **Tetra** | Discovery & Research | `firecrawl`, `langsearch`, `last30days`, `context7-mcp`, `excalidraw-diagram-generator`, `product-lens`, `teach-me`, `satori`, `deep-question`, `rag-anything` |
| **Rumi** | Growth & Content | `content-engine`, `marketing-ideas`, `lead-intelligence`, `email-sequence`, `cold-email`, `launch-strategy`, `ai-video-generation`, `canva-branded-presentation`, `agent-browser`, `twitter-automation`, `clarify`, `delight` |
| **Vulture** | Market & Finance | `alphavantage`, `xlsx`, `google-sheets`, `google-docs`, `pdf`, `docx`, `pptx`, `pricing-strategy`, `legal-advisor`, `langsearch` |
| **Librarian** | Quality & Metadata | `vault-lint`, `link-audit`, `memento-flashcards`, `xlsx` |
| **Ralph** | Engineering & Infra | `genkit`, `supabase`, `native-data-fetching`, `expo-deployment`, `expo-tailwind-setup`, `agent-browser`, `chrome-devtools`, `troubleshooting`, `memory-leak-debugging`, `debug-optimize-lcp`, `firecrawl`, `context7-mcp`, `rag-anything` |
| **Iola**      | Creative & Design            | `stitch`, `ui-ux-pro-max`, `impeccable`, `gsap`, `threejs-interaction`, `layout`, `typeset`, `colorize`, `animate`, `adapt`, `polish`, `bolder`, `quieter`, `distill`, `delight`, `clarify`, `critique`, `canva-branded-presentation`, `excalidraw-diagram-generator`, `ai-video-generation`, `audit`, `a11y-debugging` |
| **Echo**      | Operations & Infra           | `github`, `supabase`, `run_shell_command`, `agent-browser`, `chrome-devtools`, `troubleshooting`, `memory-leak-debugging`, `debug-optimize-lcp`, `firecrawl`, `context7-mcp`                                                                                                                                            |
| **Fiona**     | Product & Vision             | `product-lens`, `shape`, `pricing-strategy`, `marketing-ideas`, `launch-strategy`                                                                                                                                                                                                                                       |
| **Atlas**     | Personal Growth & Operations | `personal-assistant`, `personal-productivity`, `persona-exec-assistant`, `satori`, `teach-me`, `journal`, `google-calendar`, `gmail`, `google-docs`, `google-sheets`, `google-drive`, `google-chat`                                                                                                                     |
## 6. Strategy-to-Ship Workflow
To ensure strategic, architectural, and visual alignment, all tasks MUST follow this sequence:
1. **Strategy Phase**: `Fiona` MUST create a `brief.md` in the project directory, defining the value proposition and core features.
2. **Design Phase**: `Iola` MUST create a `design.md` based on Fiona's brief, defining the visual theme and UX logic.
3. **Execution**: `Ralph` implements the features based strictly on `Iola`'s design.
4. **Operations**: `Echo` automates deployment and monitors performance.
