/**
 * Filters out specified markdown sections from the content.
 * Also fixes markdown heading spacing (e.g., "###Heading" -> "### Heading")
 *
 * @param content - The markdown content to process
 * @param sectionsToSkip - Array of section heading names to skip (case-insensitive)
 * @returns Object containing filtered content and skipped sections for later restoration
 */
export function filterMarkdownSections(
  content: string | undefined,
  sectionsToSkip: string[],
): {
  filteredContent: string;
  skippedSections: Map<string, string>;
} {
  if (!content || sectionsToSkip.length === 0) {
    return {
      filteredContent: fixMarkdownHeadingSpacing(content || ''),
      skippedSections: new Map(),
    };
  }

  const lines = content.split('\n');
  const result: string[] = [];
  const skippedSections = new Map<string, string>();

  let currentSection: string | null = null;
  let skipCurrentSection = false;
  let sectionContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const headingMatch = line.match(/^(#{1,6})\s*(.+)$/);

    if (headingMatch) {
      // Save previous section if we were skipping it
      if (skipCurrentSection && currentSection) {
        skippedSections.set(currentSection, sectionContent.join('\n'));
        sectionContent = [];
      }

      const hashes = headingMatch[1];
      const headingText = headingMatch[2].trim();

      // Check if this heading should be skipped
      skipCurrentSection = sectionsToSkip.some(
        (skip) => skip.trim().toLowerCase() === headingText.toLowerCase(),
      );

      currentSection = headingText;

      if (skipCurrentSection) {
        // Store the heading line with proper spacing
        sectionContent.push(`${hashes} ${headingText}`);
      } else {
        // Add previous section content if we weren't skipping
        result.push(`${hashes} ${headingText}`);
      }
    } else {
      // Regular content line
      if (skipCurrentSection) {
        sectionContent.push(line);
      } else {
        result.push(line);
      }
    }
  }

  // Save the last section if we were skipping it
  if (skipCurrentSection && currentSection) {
    skippedSections.set(currentSection, sectionContent.join('\n'));
  }

  return {
    filteredContent: result.join('\n').trim(),
    skippedSections,
  };
}

/**
 * Restores skipped sections to the translated content.
 *
 * @param translatedContent - The translated markdown content
 * @param skippedSections - Map of section names to their original content
 * @returns Content with skipped sections restored
 */
export function restoreSkippedSections(
  translatedContent: string,
  skippedSections: Map<string, string>,
): string {
  if (skippedSections.size === 0) {
    return translatedContent;
  }

  // Simply append all skipped sections at the end
  const skippedContent = Array.from(skippedSections.values()).join('\n\n');

  return `${translatedContent}\n\n${skippedContent}`.trim();
}

/**
 * Fixes markdown heading spacing issues.
 * Converts "###Heading" to "### Heading"
 *
 * @param content - The markdown content to fix
 * @returns Content with properly spaced headings
 */
export function fixMarkdownHeadingSpacing(content: string): string {
  return content.replace(/^(#{1,6})([^\s#])/gm, '$1 $2');
}
