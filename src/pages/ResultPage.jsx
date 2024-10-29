import { Show } from 'solid-js';

function ResultPage(props) {
  return (
    <div class="min-h-screen bg-gray-100 p-4">
      <div class="max-w-4xl mx-auto h-full">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600">Generated Code</h1>
        </div>
        <Show when={props.generatedCode()}>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="mb-4">
              <h3 class="text-xl font-semibold mb-2">HTML</h3>
              <pre class="bg-gray-100 p-4 rounded-lg overflow-auto">
                <code>{props.generatedCode().html}</code>
              </pre>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">CSS</h3>
              <pre class="bg-gray-100 p-4 rounded-lg overflow-auto">
                <code>{props.generatedCode().css}</code>
              </pre>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}

export default ResultPage;