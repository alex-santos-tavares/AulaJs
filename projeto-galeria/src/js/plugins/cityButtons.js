import $ from 'jquery'
import { onLoadHtmlSuccess } from '../core/includes'
 
const duration = 100

function filterByCity(city) {
    $('[wm-city]').each(function(i, e) {
        const isTarget = $(this).attr('wm-city') === city || city === null
 
        if(isTarget){
            $(this).parent().removeClass('d-none')
            $(this).fadeOut(duration)
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration+500, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}
// Função para desativar os botões, exceto o do filtro atual
function desactiveElements(btnSelected){
    $('button').each(function (i, e){
        if(e !== btnSelected){
            $(e).removeClass('active')
        }
    })
}
 
$.fn.cityButtons = function() {
    const cities = new Set
    $('[wm-city]').each(function(i,e){
        cities.add($(e).attr('wm-city'))
    })
 
    const buttons = Array.from(cities).map(city => {
 
        const btn = $('<button>').addClass('btn btn-info').html(city)
 
        btn.click(function(e) {
            filterByCity(city)
            $(this).addClass('active')
            // Desativando os elementos, exceto o this
            desactiveElements(this)
        })
        return btn
    })
    
    const btnAll = $('<button>').addClass('btn btn-info active').html('Todas')
 
    btnAll.click(function(e) {
        filterByCity(null)
        $(this).addClass('active')
        desactiveElements(this)
    })
 
    buttons.push(btnAll)
    const btnGroup = $('<div>').addClass('d-flex btn-group justify-content-center')
    btnGroup.append(buttons)
 
    $(this).html(btnGroup)
    return this
}
 
onLoadHtmlSuccess( function() {
    $('[wm-city-buttons]').cityButtons()
})