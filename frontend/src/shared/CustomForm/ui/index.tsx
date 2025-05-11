import React, { ChangeEvent, ReactElement, ReactNode } from 'react';
import s from './CustomForm.module.scss'
import { HtmlContext } from 'next/dist/server/route-modules/pages/vendored/contexts/entrypoints';

interface Props {
    children: ReactNode
    onSubmit: (e:ChangeEvent<HTMLFormElement>) => void
}

export default function CustomForm({children, onSubmit}: Props){
    return (
        <form className={s.mainForm} onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
            e.preventDefault()
            onSubmit(e)
        }}>
            {children}
        </form>
    );
};