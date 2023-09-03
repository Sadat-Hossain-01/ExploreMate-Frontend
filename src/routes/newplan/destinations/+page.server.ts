import { supabase } from "$lib/supabase";

export async function load() {
    let { data, error } = await supabase
        .from('Destination')
        .select('*')
    return {
        destinations: data,
    };

    throw error;
}