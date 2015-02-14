set :css_dir,       'stylesheets'
set :js_dir,        'javascripts'
set :images_dir,    'images'
set :videos_dir,    'videos'
set :partials_dir,  'partials'

activate :directory_indexes
activate :sprockets

configure :development do
  activate :livereload
end

configure :build do
  activate :asset_hash
  activate :minify_css
  activate :minify_html
  activate :minify_javascript
end

helpers do
  def nav_link_to(title, path)
    if '/' + current_page.path == path
      tag_params = { class: 'active' }
    else
      tag_params = {}
    end

    content_tag :li, tag_params do
      link_to path do
        content_tag :span do
          title
        end
      end
    end
  end

  def slugify(string)
    string.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  end

  def body_class
    [page_classes, current_page.data.layout].join(' ').strip
  end
end
