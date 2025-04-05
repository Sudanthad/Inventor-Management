// models/stand-response.model.ts
export interface StandResponse<T> {
  status: number;
  message: string;
  data: T;
}

// models/paginated.model.ts
export interface PaginatedInAndOutDTO {
  content: any[]; // Replace 'any' with your actual item interface
  pageable: {
    pageNumber: number;
    pageSize: number;
    // Add other pagination properties as needed
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  // Add other pagination properties as needed
}
