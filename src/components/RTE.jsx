import { Editor } from '@tinymce/tinymce-react';
import React from 'react';
import { Controller } from 'react-hook-form';

function RTE({
    name,
    control,
    label,
    defaultValue = ""
}) {
    return (
        <div className="mb-4">
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
            )}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        id={name}
                        value={value}
                        onEditorChange={onChange}
                        init={{
                            branding: false,
                            height: 400,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                )}
            />
        </div>
    );
}

export default RTE;
