
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginReactQuery } from '@kubb/plugin-react-query'

export default defineConfig({
  input: {
    path: 'https://conecta-bem-back.vercel.app/swagger-output.json',
  },
  output: {
    path: './src/kubb',
    clean: true,
    
  },
  plugins: [
    pluginOas(),
    pluginTs({
      output: {
        path: 'types',
        
      },
    }),
    pluginReactQuery({
      output: {
        path: 'hooks',
       
      },
      
      
      client: {
        importPath: '@/libs/kubbClient',
      },
      mutation: {
        methods: ['post', 'put', 'patch', 'delete'],
      },
    }),
  ],
})
