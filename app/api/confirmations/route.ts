import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, status } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nome e email são obrigatórios' },
        { status: 400 }
      );
    }

    const { data: existing } = await supabase
      .from('confirmations_claudemir')
      .select('id')
      .eq('email', email)
      .single();

    let result;

    if (existing) {
      result = await supabase
        .from('confirmations_claudemir')
        .update({ name, phone: phone || null, status: status || 'confirmado' })
        .eq('email', email)
        .select()
        .single();
    } else {
      result = await supabase
        .from('confirmations_claudemir')
        .insert({ name, email, phone: phone || null, status: status || 'confirmado' })
        .select()
        .single();
    }

    if (result.error) throw result.error;

    return NextResponse.json({ success: true, confirmation: result.data }, { status: 201 });
  } catch (error) {
    console.error('Erro ao salvar confirmação:', error);
    return NextResponse.json({ error: 'Erro ao salvar confirmação' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('confirmations_claudemir')
      .select('*')
      .order('confirmed_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao ler confirmações:', error);
    return NextResponse.json({ error: 'Erro ao ler confirmações' }, { status: 500 });
  }
}
