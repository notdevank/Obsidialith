import asyncio
import argparse
import os
import sys
from functools import partial
from raganything import RAGAnything, RAGAnythingConfig
from lightrag.llm.ollama import ollama_model_complete, ollama_embed
from lightrag.utils import EmbeddingFunc

# Default configuration
DEFAULT_WORKING_DIR = "./rag_storage"
DEFAULT_LLM_MODEL = "qwen3.5:latest"
DEFAULT_EMBEDDING_MODEL = "nomic-embed-text:latest"
DEFAULT_OLLAMA_HOST = "http://localhost:11434"

async def initialize_rag(working_dir, llm_model, embedding_model, ollama_host):
    config = RAGAnythingConfig(
        working_dir=working_dir,
        parser="mineru",
        parse_method="auto",
        enable_image_processing=True,
        enable_table_processing=True,
        enable_equation_processing=True,
    )

    async def llm_model_func(prompt, system_prompt=None, history_messages=[], **kwargs):
        return await ollama_model_complete(
            llm_model,
            prompt,
            system_prompt=system_prompt,
            history_messages=history_messages,
            host=ollama_host,
            **kwargs
        )

    # Embedding function
    embedding_func = EmbeddingFunc(
        embedding_dim=768, # nomic-embed-text dim
        max_token_size=8192,
        func=partial(
            ollama_embed,
            model=embedding_model,
            host=ollama_host
        ),
    )

    # Note: Vision model is needed for image processing. 
    # Qwen 2.5/3.5 usually has VL variants, but for now we'll use text-only or placeholder.
    # We'll use the same LLM for vision if it's a VL model, otherwise skip.
    async def vision_model_func(prompt, system_prompt=None, history_messages=[], image_data=None, messages=None, **kwargs):
        if messages:
             return await llm_model_func("", system_prompt=None, history_messages=[], messages=messages, **kwargs)
        return await llm_model_func(prompt, system_prompt, history_messages, **kwargs)

    rag = RAGAnything(
        config=config,
        llm_model_func=llm_model_func,
        vision_model_func=vision_model_func,
        embedding_func=embedding_func,
    )
    return rag

async def main():
    parser = argparse.ArgumentParser(description="Obsidialith RAG-Anything Bridge")
    subparsers = parser.add_subparsers(dest="command", help="Command to execute")

    # Ingest command
    ingest_parser = subparsers.add_parser("ingest", help="Ingest a document or folder")
    ingest_parser.add_argument("path", help="Path to file or directory")
    ingest_parser.add_argument("--working-dir", default=DEFAULT_WORKING_DIR)

    # Query command
    query_parser = subparsers.add_parser("query", help="Query the knowledge base")
    query_parser.add_argument("query", help="The question to ask")
    query_parser.add_argument("--mode", choices=["naive", "local", "global", "hybrid"], default="hybrid")
    query_parser.add_argument("--working-dir", default=DEFAULT_WORKING_DIR)

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        return

    rag = await initialize_rag(args.working_dir, DEFAULT_LLM_MODEL, DEFAULT_EMBEDDING_MODEL, DEFAULT_OLLAMA_HOST)

    if args.command == "ingest":
        print(f"Ingesting path: {args.path}...")
        if os.path.isdir(args.path):
            await rag.process_folder_complete(args.path, output_dir=os.path.join(args.working_dir, "output"))
        else:
            await rag.process_document_complete(args.path, output_dir=os.path.join(args.working_dir, "output"))
        print("Ingestion complete.")

    elif args.command == "query":
        print(f"Querying Knowledge Base (Mode: {args.mode}): {args.query}")
        result = await rag.aquery(args.query, mode=args.mode)
        print("\n--- RESULT ---")
        print(result)
        print("--------------")

if __name__ == "__main__":
    asyncio.run(main())
