export const getRelevantChunks = (question, chunks, topK = 3) => {
  const keywords = question
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2);

  const scoredChunks = chunks.map(chunk => {
    const content = chunk.content.toLowerCase();

    let score = 0;

    keywords.forEach(keyword => {
      if (content.includes(keyword)) {
        score++;
      }
    });

    return {
      ...chunk.toObject(),
      score,
    };
  });

  return scoredChunks
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
};