import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationFirstPage,
	PaginationItem,
	PaginationLastPage,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './ui/pagination';

type TDynamicPagination = {
	page: number;
	setPage: (value: any) => void;
	totalPages: number;
};

export default function DynamicPagination(props: TDynamicPagination) {
	const { page, setPage, totalPages } = props;

	return (
		<Pagination className="justify-end">
			<PaginationContent className=" flex-wrap">
				<PaginationItem className="hidden sm:inline">
					<PaginationFirstPage
						onClick={() => setPage(1)}
						className={page === 1 ? ' text-slate-200 pointer-events-none' : ''}
					/>
				</PaginationItem>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => setPage((prev: number) => prev - 1)}
						className={page === 1 ? 'pointer-events-none text-slate-200' : ''}
					/>
				</PaginationItem>
				{page >= 4 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}
				{Array(totalPages || 0)
					.fill(0)
					.map((_, i) =>
						Math.abs(i + 1 - page) <= 2 ? (
							<PaginationItem key={i} className="">
								<PaginationLink
									isActive={i + 1 === page}
									onClick={() => setPage(i + 1)}
								>
									{i + 1}
								</PaginationLink>
							</PaginationItem>
						) : (
							<div key={i} className="hidden" />
						)
					)}
				{page < (totalPages || 0) - 2 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}
				<PaginationItem>
					<PaginationNext
						onClick={() => setPage((prev: number) => prev + 1)}
						className={
							page === totalPages ? 'text-slate-200 pointer-events-none' : ''
						}
					/>
				</PaginationItem>
				<PaginationItem className="hidden sm:inline">
					<PaginationLastPage
						onClick={() => setPage(totalPages)}
						className={
							page === totalPages ? 'text-slate-200 pointer-events-none' : ''
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
