

loadTaskDetails(taskId: number) {
    this.taskService.getTaskById(taskId).subscribe((task) => {
      const formattedTask = {
        ...task,
        startDate: this.formatDate(task.startDate),
        endDate: this.formatDate(task.endDate),
      };
      this.taskForm.patchValue(formattedTask);
    });
  }

  private formatDate(dateInput: string | Date): string {
    const date = new Date(dateInput); // String veya Date türünü Date nesnesine çevir
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ayı iki basamaklı yap
    const day = ('0' + date.getDate()).slice(-2); // Günü iki basamaklı yap
    return `${year}-${month}-${day}`;
  }
