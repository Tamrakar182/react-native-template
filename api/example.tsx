// // import { UserEditResponseI } from '@/types/user';
// // import api, { endpoints, queryKeys } from '@/utils/api';
// // import { useMutation } from '@tanstack/react-query';

// // export function useEditProfile() {
// //   return useMutation({
// //     mutationKey: queryKeys.user.profile,
// //     mutationFn: async (data: any) => {
// //       const res = await api.post<UserEditResponseI>(endpoints.auth.editProfile, data, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });
// //       return res.data;
// //     },
// //   });
// // }

// import api, { endpoints, queryClient, queryKeys } from '@/utils/api';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import ToastMessage from '@/components/ui/CustomToast';
// import { Job } from '@/types/staff';

// export function useFetchJobs() {
//     return useQuery({
//         queryKey: queryKeys.jobs.list,
//         queryFn: async () => {
//             const res = await api.get<{ data: Job[] }>(endpoints.job.list);
//             return res.data;
//         },
//     });
// }

// export function useDeleteJob() {
//     return useMutation({
//         mutationFn: (jobId: string) => api.get(endpoints.package.delete(jobId)),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: queryKeys.jobs.list });
//             ToastMessage('Designation deleted successfully', 'success');
//         },
//         onError: (error: any) => {
//             console.error('Delete job error:', error.response.data.message);
//             ToastMessage(error.response.data.message, 'fail');
//         },
//     });
// }

// export function useCreateJob() {
//     return useMutation({
//         mutationFn: (jobData: Partial<Job>) => api.post(endpoints.job.create, jobData),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: queryKeys.jobs.list });
//             ToastMessage('Designation created successfully', 'success');
//         },
//         onError: (error: any) => {
//             console.error('Create job error:', error.response.data.message);
//             ToastMessage(error.response.data.message, 'fail');
//         },
//     });
// }