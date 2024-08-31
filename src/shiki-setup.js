import { createHighlighterCore, loadWasm } from 'shiki/core';
import nord from 'shiki/themes/nord.mjs';
import js from 'shiki/langs/javascript.mjs';
import ts from 'shiki/langs/typescript.mjs';
import html from 'shiki/langs/html.mjs';
import css from 'shiki/langs/css.mjs';

let wasmLoaded = false;

async function loadWasmOnce() {
  if (!wasmLoaded) {
    console.log('Attempting to load WebAssembly...');
    try {
      const wasmModule = await import('shiki/onig.wasm');
      console.log('WebAssembly module imported successfully');
      await loadWasm(wasmModule.default);
      wasmLoaded = true;
      console.log('WebAssembly loaded successfully');
    } catch (error) {
      console.error('Error loading WebAssembly:', error);
      throw error;
    }
  } else {
    console.log('WebAssembly already loaded');
  }
}

export async function createHighlighter() {
  console.log('Creating highlighter...');
  try {
    await loadWasmOnce();
    console.log('Creating highlighter core...');
    const highlighter = await createHighlighterCore({
      themes: [nord],
      langs: [js, ts, html, css],
    });
    console.log('Highlighter created successfully');
    return highlighter;
  } catch (error) {
    console.error('Error creating highlighter:', error);
    return {
      codeToHtml: (code) => {
        console.log('Using fallback highlighting');
        return `<pre><code>${code}</code></pre>`;
      },
    };
  }
}