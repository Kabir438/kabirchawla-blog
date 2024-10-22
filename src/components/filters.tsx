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
    console.log(categories, options);
    return (
        <FancyMultiSelect chosenOptions={categories} updateChosenOptions={setCategories} options={options} className="[justify-self:start]"></FancyMultiSelect>
    )
}