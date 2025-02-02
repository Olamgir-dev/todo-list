
import { notification, type FormProps } from 'antd';
import Auth from '../../../services/api/auth';
import { useNavigate } from 'react-router-dom';


type FieldType = {
    login?: string;
    password?: string;
    fullName?: string;
};


const useConnect = () => {
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const onSubmit: FormProps<FieldType>['onFinish'] = (values) => {
        Auth.SignIn(values).then((res) => {
            if (res.status === 200) {
                api.success({ message: 'Успешно', description: 'Вы успешно вошли' });
                localStorage.setItem('token', res.data);
                navigate('/');
            } else {
                api.error({ message: 'Ошибка', description: res.data });
            }
        }).catch((err) => {
            api.error({ message: 'Ошибка', description: err.message });
        });
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return { onFinishFailed, onSubmit, contextHolder };
}
export default useConnect