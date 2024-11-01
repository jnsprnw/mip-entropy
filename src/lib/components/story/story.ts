export const PAGES = [
	{
		text: 'Entropy is a measure of disorder. It corresponds with how many possible configurations are compatible with a particular state. Take the case in which the nine particles in this box must be clumped together as one big square. There are only 16 ways for this state to exist.',
		actions: ['loopLow']
	},
	{
		text: 'Now, consider the state in which the particles can occupy all the squares in the box. There are 27,540,584,512 different ways they can be arranged.',
		actions: ['loopHigh']
	},
	{
		text: 'It’s much more probable for the particles to be spread throughout the box than it is for them to be clumped together. This is the basic idea behind the Second Law of Thermodynamics, the statement that entropy never decreases in a closed system.',
		actions: ['loopHigh']
	},
	{
		text: 'Entropy can also be thought of as a measure of uncertainty. Click on the squares to reveal where all nine particles are. Let’s start with the “ordered” state in which we know the particles are clumped together.',
		actions: ['guessLow']
	},
	{
		text: 'In a more “disordered” state with more possible arrangements, finding one particle doesn’t tell you as much about where the rest of them will be located. Try finding all the particles in this high-entropy state.',
		actions: ['guessHigh']
	},
	{
		text: 'Because ordered states are likely to evolve into disordered states, an observer can use her certainty about the system’s distribution to extract work.'
	},
	{
		text: 'Here, we know where the particles are and that they’re likely to evolve into a higher-entropy state. We can exploit that knowledge to lift this weight off the ground.'
	},
	{
		text: 'However, the concept of “order” can differ between observers. Here we have a room full of particles with different shapes and colors. The task is to organize the room by putting similar objects on the same side.'
	},
	{
		text: 'First up is Alice, who has blurry vision and forgot her glasses. Alice can distinguish only the colors of the particles.'
	},
	{
		text: 'Now Bob enters the room. Bob is color-blind, so he can distinguish only the shapes of the particles. To Bob, this room still looks messy.'
	},
	{
		text: 'This illustrates that entropy is a subjective measure. What different observers perceive as “ordered” depends on the information they have access to.'
	},
	{
		text: 'Earlier, we saw how it’s easier to harness work from a low-entropy state. If Alice and Bob can assign different values of entropy to the same system, what does that mean for their ability to do work?'
	},
	{
		text: 'To Bob, the room is already in a maximum-entropy state, so there’s no way for him to extract energy.'
	},
	{
		text: 'But Alice sees the room as being in a low-entropy state. So, she can lift the weight by cleverly employing a divider that responds only to red particles.'
	}
];
