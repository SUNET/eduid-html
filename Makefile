sync_dev_files:
	test -n '$(DEV)' || exit 1
	fswatch -o . | while read n; do rsync -a --delete . eduid@eduid-developer-${DEV}-1.sunet.se:/opt/eduid/src/eduid-html/; done

.PHONY: sync_dev_files
