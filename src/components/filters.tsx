"use client"

import { Dispatch, SetStateAction } from "react";
import FancyMultiSelect, { type Option } from "./ui/multiselect"

export default function Filter({
    options,
    categories,
    setCategories,
}: {
    options: Option[];
    categories: Option[];
    setCategories: Dispatch<SetStateAction<Option[]>>
}) {
    return (
        <FancyMultiSelect chosenOptions={categories} updateChosenOptions={setCategories} options={options} className="[justify-self:start]"></FancyMultiSelect>
    )
}