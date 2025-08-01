import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import { BrnMenuItemRadio } from '@spartan-ng/brain/menu';
import type { ClassValue } from 'clsx';

@Directive({
	selector: '[hlmMenuItemRadio]',
	host: {
		'[class]': '_computedClass()',
	},
	hostDirectives: [
		{
			directive: BrnMenuItemRadio,
			inputs: ['disabled: disabled', 'checked: checked'],
			outputs: ['triggered: triggered'],
		},
	],
})
export class HlmMenuItemRadio {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() =>
		hlm(
			'group w-full relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
			this.userClass(),
		),
	);
}
