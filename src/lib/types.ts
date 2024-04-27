export interface BlogPost {
    author: {
      name: string;
    };
  
    categories: [
      {
        title: string;
      }
    ];
    body: [];
    publishedAt: string;
    title: string;
    description: string;
    slug: {
      current: string;
    };
    mainImage: {
      asset: {
        url: string;
      };
    };
  }
  
  export interface Category {
    category: string;
    count: number;
    name:string;
  }