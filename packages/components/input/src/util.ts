let hiddenTextarea: HTMLTextAreaElement | undefined = undefined;

interface TextareaHeight {
    height: string,
    minHeight?: string
}

interface NodeStyle {
    contextStyle: string;
    boxSizing: string;
    paddingSize: number;
    borderSize: number;
}
const CONTEXT_STYLE = [
    'line-height',
    'padding-top',
    'padding-bottom',
    'padding-left',
    'padding-right',
    'width',
    'border-width',
    'box-sizing',
    'font-family',
    'font-weight',
    'text-rendering',
    'text-transform',
    'text-indent',
    'letter-spacing'
];

function calculateNodeStyling(targetElelement: Element): NodeStyle {
    const style = window.getComputedStyle(targetElelement);

    const boxSizing = style.getPropertyValue('box-sizing');

    const paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) +
        parseFloat(style.getPropertyValue('padding-top'));

    const borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) +
        parseFloat(style.getPropertyValue('border-top-width'));

    const contextStyle = CONTEXT_STYLE.map((name) => {
        return `${name}: ${style.getPropertyValue(name)}`;
    }).join(';');
    return { contextStyle, paddingSize, borderSize, boxSizing };
}

const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`;

export function calcTextareaHeight(
    targetElelement: HTMLTextAreaElement,
    minRows = 1,
    maxRows?: number
): TextareaHeight {
    console.log('\ncalcTextareaHeight start');
    if(!hiddenTextarea) {
        hiddenTextarea = document.createElement('textarea');
        document.body.appendChild(hiddenTextarea);
        console.log('创建hiddenTextarea');
    }
    const { paddingSize, borderSize, boxSizing, contextStyle } = calculateNodeStyling(targetElelement);
    hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
    hiddenTextarea.value = targetElelement.value || targetElelement.placeholder || '';

    let height = hiddenTextarea.scrollHeight;
    console.log('滚动高度为：' + height);
    const result = {} as TextareaHeight;
    if(boxSizing === 'border-box') {
        height = height + borderSize;
    }else if(boxSizing === 'content-box') {
        height = height - paddingSize;
    }

    hiddenTextarea.value = '';
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize - borderSize;
    console.log('一行的高度为：' + singleRowHeight);
    if(typeof minRows === 'number') {
        let minHeight = singleRowHeight * minRows;
        if(boxSizing === 'border-box') {
            minHeight = minHeight + paddingSize + borderSize;
        }
        height = Math.max(minHeight, height);
        console.log('minRows: height='+height, ' minHeight='+minHeight);
        result.minHeight = `${minHeight}px`;
    }
    if(typeof maxRows === 'number') {
        let maxHeight = singleRowHeight * maxRows;
        if(boxSizing === 'border-box') {
            maxHeight = maxHeight + paddingSize + borderSize;
        }
        height = Math.min(maxHeight, height);
        console.log('maxRows: height='+height, ' maxHeight='+maxHeight);
    }
    result.height = `${height}px`;
    hiddenTextarea.parentNode?.removeChild(hiddenTextarea);
    hiddenTextarea = undefined;
    console.log('移出hiddenTextarea');
    return result;
}
