import * as React from 'react';
import {
	ChevronLeft,
	ChevronsLeft,
	ChevronRight,
	ChevronsRight,
	MoreHorizontal,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { ButtonProps, buttonVariants } from '@/components/ui/button';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
	<nav
		role="navigation"
		aria-label="pagination"
		className={cn('mx-auto flex w-full justify-center', className)}
		{...props}
	/>
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
	HTMLUListElement,
	React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		className={cn('flex flex-row items-center gap-1', className)}
		{...props}
	/>
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
	<li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
	React.ComponentProps<'a'>;

const PaginationLink = ({
	className,
	isActive,
	size = 'icon',
	...props
}: PaginationLinkProps) => (
	<a
		aria-current={isActive ? 'page' : undefined}
		className={cn(
			buttonVariants({
				variant: isActive ? 'pagination' : 'ghost',
				size,
			}),
			className,
			'hover:bg-slate-200 p-[0px] sm:p-2'
		)}
		{...props}
	/>
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Go to previous page"
		size="default"
		className={cn('pl-2.5', className, 'hover:bg-slate-200')}
		{...props}
	>
		<ChevronLeft className="h-4 w-4" />
		{/* <span>`{"<"}`</span> */}
	</PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationFirstPage = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Volte para primeira página"
		size="default"
		className={cn('pl-2.5', className, 'hover:bg-slate-200')}
		{...props}
	>
		<ChevronsLeft className="h-5 w-5" />
	</PaginationLink>
);
PaginationFirstPage.displayName = 'PaginationFirstPage';

const PaginationNext = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Go to next page"
		size="default"
		className={cn('pr-2.5', className, 'hover:bg-slate-200')}
		{...props}
	>
		{/* <span>`{">"}`</span> */}
		<ChevronRight className="h-4 w-4" />
	</PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationLastPage = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Volte para primeira página"
		size="default"
		className={cn('pl-2.5', className, 'hover:bg-slate-200')}
		{...props}
	>
		<ChevronsRight className="h-5 w-5" />
		{/* <span>`{"<"}`</span> */}
	</PaginationLink>
);
PaginationLastPage.displayName = 'PaginationLastPage';

const PaginationEllipsis = ({
	className,
	...props
}: React.ComponentProps<'span'>) => (
	<span
		aria-hidden
		className={cn('flex h-9 w-9 items-center justify-center !m-0', className)}
		{...props}
	>
		<MoreHorizontal className="h-4 w-4" />
		<span className="sr-only">Mais páginas</span>
	</span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	PaginationFirstPage,
	PaginationLastPage,
};
