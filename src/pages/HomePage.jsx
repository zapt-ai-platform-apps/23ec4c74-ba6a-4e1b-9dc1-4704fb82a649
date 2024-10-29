import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { createEvent } from '../supabaseClient';

function HomePage(props) {
  const [description, setDescription] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const navigate = useNavigate();

  const handleGenerateCode = async () => {
    if (!description()) return;
    setLoading(true);
    try {
      const prompt = `Generate a simple HTML and CSS code for a website according to the following description: ${description()}. Return the code in JSON format with "html" and "css" properties.`;
      const result = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'json'
      });
      props.setGeneratedCode(result);
      navigate('/result');
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gray-100 p-4">
      <div class="max-w-4xl mx-auto h-full">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600">Website Source Code Generator</h1>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold mb-4">Describe the website you want to generate</h2>
          <textarea
            rows="5"
            value={description()}
            onInput={(e) => setDescription(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            placeholder="Enter your website description here..."
          />
          <button
            onClick={handleGenerateCode}
            class={`mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              loading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading()}
          >
            {loading() ? 'Generating...' : 'Generate Code'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;