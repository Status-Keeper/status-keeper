import i0010 from './0-10.jpg';
import i1030 from './10-30.jpg';
import i3080 from './30-80.jpg';
import i80100 from './80-100.jpg';

export function getStageImage(percent: number) {
	if (percent < 11) return i0010;

	if (percent < 31) return i1030;

	if (percent < 81) return i3080;

	return i80100;
}