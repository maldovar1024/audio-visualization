use js_sys::Uint8Array;
use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;

#[wasm_bindgen]
pub fn draw_frequency(
    ctx: &CanvasRenderingContext2d,
    width: f64,
    height: f64,
    data_buffer: &Uint8Array,
) {
    let buffer_length: u32 = data_buffer.length();

    ctx.set_fill_style(&"#101010".into());
    ctx.fill_rect(0.0, 0.0, width, height);

    let bar_width = width / buffer_length as f64;
    let height_rate = 0.5;

    let mut x = width / 2.0;

    for i in 0..buffer_length {
        if x > width {
            break;
        }
        let bar_height = data_buffer.get_index(i) as u16;
        ctx.set_fill_style(&format!("rgb(50, {}, 50)", bar_height + 100).into());
        let bar_height = bar_height as f64;
        ctx.fill_rect(
            x,
            height - bar_height * height_rate,
            bar_width,
            bar_height * height_rate,
        );

        x += bar_width + 1.0;
    }

    x = width / 2.0 - bar_width - 1.0;
    for i in 0..buffer_length {
        if x <= -bar_width {
            break;
        }
        let bar_height = data_buffer.get_index(i) as u16;
        ctx.set_fill_style(&format!("rgb(50, {}, 50)", bar_height + 100).into());
        let bar_height = bar_height as f64;
        ctx.fill_rect(
            x,
            height - bar_height * height_rate,
            bar_width,
            bar_height * height_rate,
        );

        x -= bar_width + 1.0;
    }
}
