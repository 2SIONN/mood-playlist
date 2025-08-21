import { QueryClient } from "@tanstack/react-query";

// 전역에서 사용할 QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 창 포커스 시 자동 새로고침 비활성화
      retry: 1, // 실패 시 1회 재시도
      staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선하게 유지
    },
  },
});

export default queryClient;