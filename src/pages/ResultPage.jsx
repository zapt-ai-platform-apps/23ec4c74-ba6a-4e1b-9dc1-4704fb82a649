import { Show, createSignal } from 'solid-js';

function ResultPage(props) {
  const [copySuccess, setCopySuccess] = createSignal('');

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess('تم النسخ إلى الحافظة!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div class="min-h-screen bg-gray-100 p-4" dir="rtl">
      <div class="max-w-4xl mx-auto h-full">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600 text-right">الكود الناتج</h1>
        </div>
        <Show when={props.generatedCode()}>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="mb-8">
              <h3 class="text-xl font-semibold mb-2 text-right">HTML</h3>
              <button
                class="mb-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                onClick={() => copyToClipboard(props.generatedCode().html)}
              >
                نسخ الكود
              </button>
              <pre class="bg-gray-100 p-4 rounded-lg overflow-auto text-left">
                <code>{props.generatedCode().html}</code>
              </pre>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2 text-right">CSS</h3>
              <button
                class="mb-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                onClick={() => copyToClipboard(props.generatedCode().css)}
              >
                نسخ الكود
              </button>
              <pre class="bg-gray-100 p-4 rounded-lg overflow-auto text-left">
                <code>{props.generatedCode().css}</code>
              </pre>
            </div>
            <Show when={copySuccess()}>
              <div class="mt-4 text-green-600 text-right">{copySuccess()}</div>
            </Show>
          </div>
        </Show>
      </div>
    </div>
  );
}

export default ResultPage;