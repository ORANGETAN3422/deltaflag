<script>
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import GmlFilename from '$lib/components/GmlFilename.svelte';
	import ValuesTable from '$lib/components/ValuesTable.svelte';

	const choicerCreateName = "gml_Object_obj_choicer_neo_Create_0";
    const choicerStepName = "gml_Object_obj_choicer_neo_Step_0";

	const conditionOne = "if (global.flag[33] < 40)";
    const conditionTwo = "if (global.flag[33] >= 40)";

    const sansDialogue = "* ... hey bud.\n* ... are you busy tomorrow...?\n* i need some help with something.\n* it'd be great if you could come over.\n* i live just next door, ya know."
</script>

This flag is used to track the amount of time spent on a choicer.

In <GmlFilename filename={choicerCreateName} />, the flag's value is set to 0.  
In <GmlFilename filename={choicerStepName} />, the flag's value is incremented by 1 every frame.

When the choicer ends, the value will persist until the next choicers creation resets it to 0.

<hr />

<h2>Uses</h2>

This flag is only really used in one scenario, which is in <span class="text-green">Chapter 1</span>.
Depsite this, the different choicer types implemented into the <span class="text-green">Chapter 4</span> choicers also increment and reset the flag.
This means that the flag might be reused for some other time-based choicers in future chapters, or that the code in the <span class="text-green">Chapter 4</span> choicers was just copy pasted.

The only interaction currently in the game where the time spent on the choicer is relevant is with <span class="text-soul">Sans</span> in his shop, when asking Kris to come over the next day.
<CodeBlock code={sansDialogue} type='block' lang='' />

<br />

When answering too fast, <span class="text-soul">Sans</span> will comment on how you answered too quickly. This is like 3 extra lines if you say yes, and 1 extra line if you say no. The condition for answering quickly is <CodeBlock code={conditionOne} />.

When answering after any other duration, <span class="text-soul">Sans</span>, you'll still only get 3 extra lines of dialogue if you say yes and one line for saying no, so this whole choicer time thing is kind of pointless but it's these small interactions which make the game good. The condition for this is <br /><CodeBlock code={conditionTwo} />.
