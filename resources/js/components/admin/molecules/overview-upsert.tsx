import { Overview } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import VideoInput from '../atoms/video-input';
import { ActionBtns } from './action-btns';

type OverviewForm = {
    video: File | null;
};

type OverviewUpsertProps = {
    routeName: string;
    overview?: Overview;
};

export default function OverviewUpsert({
    routeName,
    overview,
}: OverviewUpsertProps) {
    const [isEdited, setIsEdited] = useState(overview == null);

    const {
        post,
        reset,
        clearErrors,
        setData,
        errors,
        progress,
        processing,
        setDefaults,
        recentlySuccessful,
    } = useForm<OverviewForm>({
        video: null,
    });

    const handleCancelClick = () => {
        setIsEdited((o) => !o);
        reset();
        clearErrors();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(routeName, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setDefaults();
                setIsEdited(false);
            },
        });
    };

    return (
        <div className="relative z-50 pt-4">
            <form
                className="space-y-8"
                onSubmit={submit}
                encType="multipart/form-data"
            >
                <div>
                    <VideoInput
                        key="video-input"
                        progress={progress}
                        isEdited={isEdited}
                        onChange={(file) => setData('video', file)}
                        error={errors.video}
                    />
                </div>

                <ActionBtns
                    isCreate={overview == null}
                    edited={isEdited}
                    onCancel={handleCancelClick}
                    saved={recentlySuccessful}
                    loading={processing}
                />
            </form>
        </div>
    );
}
