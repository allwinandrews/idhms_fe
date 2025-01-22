import React, { useState } from 'react';
import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    Paper,
    Box,
} from '@mui/material';

interface Column<RowData> {
    id: keyof RowData;
    label: string;
    width?: number;
    align?: 'left' | 'right' | 'center';
    sortable?: boolean;
    render?: (value: RowData[keyof RowData], row: RowData) => React.ReactNode;
}

interface TableProps<RowData> {
    columns: Column<RowData>[];
    rows: RowData[];
    initialSortColumn?: keyof RowData;
    initialSortDirection?: 'asc' | 'desc';
    filters?: Partial<Record<keyof RowData, string | number>>;
    onFilterChange?: (filters: Partial<Record<keyof RowData, string | number>>) => void;
}

const Table = <RowData,>({
    columns,
    rows,
    initialSortColumn,
    initialSortDirection = 'asc',
    filters = {} as Partial<Record<keyof RowData, string | number>>,
    onFilterChange,
}: TableProps<RowData>): React.JSX.Element => {
    const [sortColumn, setSortColumn] = useState<keyof RowData | undefined>(initialSortColumn);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSort = (columnId: keyof RowData) => {
        const isAsc = sortColumn === columnId && sortDirection === 'asc';
        setSortDirection(isAsc ? 'desc' : 'asc');
        setSortColumn(columnId);
    };

    const handleFilterChange = (columnId: keyof RowData, value: string | number) => {
        const newFilters = { ...filters, [columnId]: value };
        onFilterChange?.(newFilters);
    };

    const filteredRows = rows.filter((row) =>
        columns.every((column) => {
            const filterValue = filters[column.id];
            const cellValue = row[column.id];

            if (!filterValue) return true; // Skip if no filter is applied
            if (typeof cellValue === 'string' && typeof filterValue === 'string') {
                return cellValue.toLowerCase().includes(filterValue.toLowerCase());
            } else if (typeof cellValue === 'number' && typeof filterValue === 'number') {
                return cellValue === filterValue;
            }
            return true;
        })
    );

    const sortedRows = [...filteredRows].sort((a, b) => {
        if (!sortColumn) return 0;
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const paginatedRows = sortedRows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    return (
        <Box>
            <TableContainer component={Paper}>
                <MuiTable>
                    <TableHead>
                        <TableRow>
                            {columns.map((column: Column<RowData>) => (
                                <TableCell
                                    key={column.id.toString()}
                                    align={column.align || 'left'}
                                    style={{ width: column.width }}
                                >
                                    {column.sortable ? (
                                        <TableSortLabel
                                            active={sortColumn === column.id}
                                            direction={sortDirection}
                                            onClick={() => handleSort(column.id)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    ) : (
                                        column.label
                                    )}
                                    {onFilterChange && (
                                        <input
                                            type="text"
                                            placeholder={`Filter ${column.label}`}
                                            value={filters[column.id] || ''}
                                            onChange={(e) => handleFilterChange(column.id, e.target.value)}
                                            style={{
                                                marginTop: '8px',
                                                width: '100%',
                                                padding: '4px',
                                                fontSize: '12px',
                                            }}
                                        />
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columns.map((column) => (
                                    <TableCell key={column.id.toString()} align={column.align || 'left'}>
                                        {column.render
                                            ? column.render(row[column.id], row)
                                            : String(row[column.id])}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
            />
        </Box>
    );
};

export default Table;
