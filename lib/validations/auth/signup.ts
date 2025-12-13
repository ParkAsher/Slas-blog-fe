import { z } from 'zod';

export const signUpSchema = z
    .object({
        email: z.string().min(1, '이메일을 입력해주세요.').email('올바른 이메일 형식이 아닙니다.'),
        password: z
            .string()
            .min(8, '비밀번호는 8~16자여야 합니다.')
            .max(16, '비밀번호는 8~16자여야 합니다.')
            .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, '비밀번호는 영문과 숫자를 모두 포함해야 합니다.'),
        passwordConfirm: z.string().min(1, '비밀번호를 한 번 더 입력해주세요.'),
        nickname: z
            .string()
            .min(2, '닉네임은 2~8자여야 합니다.')
            .max(8, '닉네임은 2~8자여야 합니다.'),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.passwordConfirm) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['passwordConfirm'],
                message: '비밀번호가 일치하지 않습니다',
            });
        }
    });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
