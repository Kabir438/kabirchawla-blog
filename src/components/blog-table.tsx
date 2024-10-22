"use client"

import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export default function BlogTable({
    value
}: {
    value: {
        _type: "table";
        _key: string;
        rows: {
            _type: "tableRow";
            _key: string;
            cells: string[];
        }[];
    }
}) {
    return (
        <div className="w-full h-max flex justify-center items-center my-8">
            <div className="border-gray-200 w-max border-[2px] rounded-xl overflow-hidden">
                <Table className="!w-max">
                    <TableHeader>
                        <TableRow className="border-gray-400 hover:bg-transparent">
                            {
                                value.rows[0].cells.map((cell, ci, arr) => (
                                    <TableHead key={cell} className={cn("font-semibold text-center px-5 border-gray-400 hover:bg-muted/70 transition-colors text-lg text-white", ci < arr.length - 1 && "border-r")}>{cell}</TableHead>
                                ))
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {value.rows.filter((_, i) => i > 0).map((vTop) => (
                            <TableRow className="border-gray-400 hover:bg-transparent" key={vTop.cells.join("-")}>
                                {
                                    vTop.cells.map((cell, ci, arr) => (
                                        <TableCell key={cell} className={cn("font-medium text-center px-5 border-gray-400 hover:bg-muted/50 transition-colors text-gray-200", ci < arr.length - 1 && "border-r")}>{cell}</TableCell>
                                    ))
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}