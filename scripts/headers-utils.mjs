export const normalizeHeaderValue = (value) => value.trim().replace(/\s+/g, ' ');

export const parseHeadersBlocks = (headersText) => {
  const blocks = new Map();
  const lines = headersText.split('\n');
  let currentPattern = null;
  let currentHeaders = null;

  for (const line of lines) {
    if (!line.trim()) {
      currentPattern = null;
      currentHeaders = null;
      continue;
    }

    if (!line.startsWith(' ')) {
      currentPattern = line.trim();
      currentHeaders = new Map();
      blocks.set(currentPattern, currentHeaders);
      continue;
    }

    if (!currentPattern || !currentHeaders) {
      continue;
    }

    const trimmedLine = line.trim();
    const separatorIndex = trimmedLine.indexOf(':');
    if (separatorIndex === -1) {
      continue;
    }

    const name = trimmedLine.slice(0, separatorIndex).trim().toLowerCase();
    const value = normalizeHeaderValue(trimmedLine.slice(separatorIndex + 1));
    currentHeaders.set(name, value);
  }

  return blocks;
};
