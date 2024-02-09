export default {
  async fetch(request: Request, env: any): Promise<Response> {
    return new Response('Chat function is working', { status: 200 });
  },
};
