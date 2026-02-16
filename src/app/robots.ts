const robots = () => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: process.env.NEXT_PUBLIC_BASE_URL,
  };
};

export default robots;
