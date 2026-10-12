import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';

const fieldClass =
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

export default function TicketForm({ form, options, onSubmit, submitLabel }) {
    const { data, setData, errors, processing } = form;

    const renderSelect = (name, label, items) => (
        <div>
            <InputLabel htmlFor={name} value={label} />
            <select
                id={name}
                className={fieldClass}
                value={data[name]}
                onChange={(e) => setData(name, e.target.value)}
            >
                {items.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <InputError message={errors[name]} className="mt-2" />
        </div>
    );

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <div>
                <InputLabel htmlFor="title" value="Title" />
                <TextInput
                    id="title"
                    className="mt-1 block w-full"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    rows="5"
                    className={fieldClass}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
                {renderSelect('priority', 'Priority', options.priorities)}
                {renderSelect('status', 'Status', options.statuses)}
                {renderSelect('category', 'Category', options.categories)}
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>{processing ? 'Saving...' : submitLabel}</PrimaryButton>
                <Link href={route('tickets.index')} className="text-sm text-gray-600 hover:underline">
                    Cancel
                </Link>
            </div>
        </form>
    );
}