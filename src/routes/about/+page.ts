import { codeToHtml } from 'shiki';

async function highlight(code: string) {
	const raw = await codeToHtml(code, { lang: 'js', theme: 'dark-plus' });
	return raw
		.replace(/<pre[^>]*><code[^>]*>/, '')
		.replace(/<\/code><\/pre>/, '')
		.replace(/background(-color)?:[^;"]*/g, '');
}

export async function load() {
    return {
        global_flags: await highlight("global.flags"),
        example_usages: [
            { 
                filename: 'gml_Object_obj_orange_shop_Create_0.gml', 
                line: '20', 
                code: await highlight('global.flag[666] = 1;') 
            }, 
            { 
                filename: 'gml_Object_obj_gaster_battle_Step_0.gml', 
                line: '47', 
                code: await highlight('if (global.flag[666] == 0)')
            }, 
            { 
                filename: 'gml_Object_obj_berdly_date_Create_0.gml', 
                line: '7', 
                code: await highlight('global.flag[666] = 0;') 
            }
        ]
    };
}