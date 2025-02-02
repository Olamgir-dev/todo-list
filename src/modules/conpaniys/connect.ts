import { Form, notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Companies from "../../services/api/companies";
import Auth from "../../services/api/auth";
import { Paths } from "../../routers/paths";

interface DataType {
    id?: string;
    key?: string;
    name: string;
    count: number;
}

const useConnect = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);
    const [pagination, setPagination] = useState({ PageSize: 10, PageIndex: 1, TotalCount: 0, TotalPages: 0 });
    const [isEdit, setIsEdit] = useState(false);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [formData, setFormData] = useState<DataType | null>({
        id: "",
        name: "",
        count: 0
    });
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    // 🚀 Get all companies
    const { data, isLoading, error } = useQuery({
        queryKey: ["companies", pagination.PageIndex, pagination.PageSize], // include pagination params in queryKey to refetch data
        queryFn: () =>
            Companies.GetAllCompanies({
                PageSize: pagination.PageSize,
                PageIndex: pagination.PageIndex,
            }).then((res) => {
                // Correct the logic to access pagination from data
                const pagenation = JSON.parse(res.headers.pagination);
                setPagination((prev) => ({
                    ...prev,
                    TotalCount: pagenation.TotalCount,
                    TotalPages: pagenation.TotalPages,
                }));
                return res.data;
            }),
    });



    // 🚀 Create company mutation
    const createCompanyMutation = useMutation({
        mutationFn: (newCompany: Omit<DataType, "key">) => Companies.PostCompanies(newCompany),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["companies"] }); // Ma'lumotni avtomatik yangilash
            setIsEditModalOpen(false);
            api.success({ message: 'Успешно', description: 'Компания успешно создана' });
        },
    });

    // 🚀 Update company mutation
    const updateCompanyMutation = useMutation({
        mutationFn: (updatedCompany: Omit<DataType, "key">) => Companies.UpdateCompanies(updatedCompany),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["companies"] });
            setIsEditModalOpen(false);
            api.success({ message: 'Успешно', description: 'Компания успешно обновлена' });
        },
        onError: () => {
            api.error({ message: 'Ошибка', description: 'Произошла ошибка при обновлении компании' });
            setIsEditModalOpen(false);
        }
    });

    // 🚀 Delete company mutation
    const deleteCompanyMutation = useMutation({
        mutationFn: (companyKey: string) => Companies.DeleteCompanies(companyKey),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["companies"] });
            api.success({ message: 'Успешно', description: 'Компания успешно удалена' });
            setIsDeleteModalOpen(false);
        },
        onError: () => {
            api.error({ message: 'Ошибка', description: 'Произошла ошибка при удалении компании' });
            setIsDeleteModalOpen(false);
        }
    });

    // 🔹 Edit modalni ochish
    const showEditModal = useCallback((record: DataType) => {
        setFormData(record);
        setSelectedRecord(record);
        form.setFieldsValue(record);
        setIsEditModalOpen(true);
    }, [form]);

    // 🔹 Edit qilishni tasdiqlash
    const handleEditOk = () => {
        form.validateFields().then((values) => {
            if (isEdit && selectedRecord) {
                updateCompanyMutation.mutate({ ...selectedRecord, ...values })
            } else {
                // For new company creation
                createCompanyMutation.mutate(values);  // <-- New company mutation

            }
        }).catch((err) => {

        });
    };

    // 🔹 Edit modalni yopish
    const handleEditCancel = () => {
        setIsEditModalOpen(false);
    };

    // 🔹 Delete modalni ochish
    const showDeleteModal = (record: DataType) => {
        setSelectedRecord(record);
        setIsDeleteModalOpen(true);
    };

    // 🔹 O'chirishni tasdiqlash
    const handleDeleteOk = () => {
        if (selectedRecord?.id) {
            deleteCompanyMutation.mutate(selectedRecord?.id);
        }
    };

    // 🔹 O'chirish modalni yopish
    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
    };
    useEffect(() => {
        Auth.UserInfo().then(res => {
            if (res.status !== 200) {
                navigate(Paths.SIGN_IN);
            }
        }).catch(() => {
            navigate(Paths.SIGN_IN);
        })
    }, [])

    return {
        isDeleteModalOpen,
        isEditModalOpen,
        selectedRecord,
        data,
        isLoading,
        contextHolder,
        isEdit,
        formData,
        setIsEdit,
        error,
        form,
        pagination,
        navigate,
        showEditModal,
        setPagination,
        handleEditOk,
        handleEditCancel,
        showDeleteModal,
        handleDeleteOk,
        handleDeleteCancel,
        createCompany: createCompanyMutation.mutate,
    };
};

export default useConnect;
