import { createHighlighterCore, loadWasm } from 'shiki/core';
import nord from 'shiki/themes/nord.mjs';
import js from 'shiki/langs/javascript.mjs';
import ts from 'shiki/langs/typescript.mjs';
import html from 'shiki/langs/html.mjs';
import css from 'shiki/langs/css.mjs';

let wasmLoaded = false;

async function loadWasmOnce() {
  if (!wasmLoaded) {
    try {
      const response = await fetch('/wasm/onig.wasm');
      if (!response.ok) {
        throw new Error(`Failed to fetch onig.wasm: ${response.status} ${response.statusText}`);
      }
      const wasmBinary = await response.arrayBuffer();
      await loadWasm(wasmBinary);
      wasmLoaded = true;
      console.log('WebAssembly loaded successfully');
    } catch (error) {
      console.error('Error loading WebAssembly:', error);
      throw error;
    }
  }
}

export async function createHighlighter() {
  try {
    await loadWasmOnce();
    const highlighter = await createHighlighterCore({
      themes: [nord],
      langs: [js, ts, html, css],
    });
    console.log('Highlighter created successfully');
    return highlighter;
  } catch (error) {
    console.error('Error creating highlighter:', error);
    // Return a fallback highlighter that doesn't actually highlight
    return {
      codeToHtml: (code) => `<pre><code>${code}</code></pre>`,
    };
  }
}